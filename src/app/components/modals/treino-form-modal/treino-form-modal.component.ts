import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import {
  ImageCroppedEvent,
  ImageCropperComponent
} from 'ngx-image-cropper';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TreinoService } from 'src/app/core/services/treino.service';

@Component({
  selector: 'app-treino-form-modal',
  templateUrl: './treino-form-modal.component.html',
  styleUrls: ['./treino-form-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ImageCropperComponent,
  ],
})
export class TreinoFormModalComponent implements OnInit {
  @Input() treinoId?: string;

  private modalController = inject(ModalController);
  private treinoService = inject(TreinoService);
  private authService = inject(AuthService);
  private toastController = inject(ToastController);

  treinoForm!: FormGroup;
  imageChangedEvent: Event | null = null;
  croppedImage: string = '';
  showCropper = false;
  loading = false;
  aspectRatio = 500 / 334;
  isEditMode = false;

  async ngOnInit() {
    this.initForm();

    if (this.treinoId) {
      this.isEditMode = true;
      await this.loadTreino();
    }
  }

  private initForm() {
    this.treinoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl(''),
    });
  }

  private async loadTreino() {
    this.loading = true;
    try {
      const treino = await lastValueFrom(
        this.treinoService.getTreinoById(this.treinoId!)
      );

      if (treino) {
        this.treinoForm.patchValue({
          nome: treino.nome,
          imageUrl: treino.imageUrl,
        });

        if (treino.imageUrl) {
          this.croppedImage = treino.imageUrl;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar treino:', error);
      await this.showErrorToast('Erro ao carregar treino');
    } finally {
      this.loading = false;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageChangedEvent = event;
      this.showCropper = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = event.base64;
    }
  }

  loadImageFailed() {
    this.showErrorToast('Erro ao carregar a imagem. Tente outro arquivo.');
    this.showCropper = false;
  }

  async confirmCrop() {
    if (this.croppedImage) {
      this.treinoForm.patchValue({ imageUrl: this.croppedImage });
      this.showCropper = false;
      await this.showSuccessToast('Imagem adicionada com sucesso!');
    } else {
      await this.showErrorToast('Nenhuma imagem para confirmar');
    }
  }

  cancelCrop() {
    this.showCropper = false;
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  selectImage() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  removeImage() {
    this.treinoForm.patchValue({ imageUrl: '' });
    this.croppedImage = '';
    this.imageChangedEvent = null;
  }

  async save() {
    if (this.treinoForm.invalid) {
      this.treinoForm.markAllAsTouched();
      await this.showErrorToast('Preencha todos os campos obrigatórios');
      return;
    }

    this.loading = true;

    try {
      const { nome, imageUrl } = this.treinoForm.value;

      if (this.isEditMode && this.treinoId) {
        await lastValueFrom(
          this.treinoService.updateTreino(this.treinoId, {
            nome,
            imageUrl,
          })
        );
        await this.showSuccessToast('Treino atualizado com sucesso!');
      } else {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          await this.showErrorToast('Usuário não identificado');
          return;
        }

        await lastValueFrom(
          this.treinoService.createTreino({
            nome,
            imageUrl,
            userId: currentUser.id,
          })
        );
        await this.showSuccessToast('Treino criado com sucesso!');
      }

      this.modalController.dismiss({ success: true });
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      await this.showErrorToast('Erro ao salvar treino. Tente novamente.');
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  hasError(fieldName: string): boolean {
    const field = this.treinoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.treinoForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres';
    }
    return '';
  }
}
