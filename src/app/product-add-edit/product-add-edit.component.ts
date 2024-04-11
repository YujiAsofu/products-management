import { Component, Inject, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CoreService } from '../core/core.service'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss',
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup

  categories: string[] = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
  ]

  selectedThumbnail: File | undefined
  selectedImages: File[] = []

  onThumbnailSelected(event: any) {
    const file: File = event.target.files[0]
    this.selectedThumbnail = file
  }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i])
    }
  }

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.productForm = this._fb.group({
      id: '',
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      brand: '',
      category: '',
      thumbnail: '',
      images: '',
    })
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this._productService
          .updateProduct(this.data.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.productForm.value),
          })
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Produto atualizado com sucesso!')
              this._dialogRef.close(true)
            },
            error: (err: any) => {
              console.error(err)
            },
          })
        console.log(
          `Produto ${this.productForm.value.title} atualizado com sucesso! Detalhes abaixo:`
        )
        console.log(this.productForm.value)
      } else {
        this._productService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produto adicionado com sucesso')
            this._dialogRef.close(true)
            console.log(
              `Produto ${this.productForm.value.title} adicionado com sucesso! Detalhes abaixo:`
            )
            console.log(this.productForm.value)
          },
          error: (err: any) => {
            console.error(err)
          },
        })
      }
    }
  }
}
