import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialog } from '@angular/material/dialog'
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component'
import { ProductService } from '../services/product.service'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CoreService } from '../core/core.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'price',
    'rating',
    'stock',
    'actions',
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  public dataSource = new MatTableDataSource<any>()

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _coreService: CoreService
  ) {}

  openAddEditProductForm() {
    const dialogRef = this._dialog.open(ProductAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this.getProductList()
        }
      },
    })
  }

  ngOnInit(): void {
    this.getProductList()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  getProductList() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this._productService.getProductList().subscribe(data => {
      this.dataSource.data = data.products
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: res => {
        this._coreService.openSnackBar('Produto removido com sucesso!')
        console.log(`Produto ${res.title} removido com sucesso.`)
        console.log('isDeleted:', res.isDeleted)
        console.log('DeletedOn:', res.deletedOn)
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    this._dialog.open(ProductAddEditComponent, {
      data: data,
    })
  }
}
