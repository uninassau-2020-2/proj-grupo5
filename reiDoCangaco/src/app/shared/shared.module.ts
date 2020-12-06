import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatNativeDateModule, MatCardModule, MatStepperModule,
MatTableModule, MAT_DATE_LOCALE, MatPaginatorModule, MatAutocompleteModule,
MatDialogModule, MatDividerModule, MatSortModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [],
    imports:
        [
            MatProgressSpinnerModule,
            MatMenuModule,
            MatButtonModule,
            ReactiveFormsModule,
            FormsModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatRadioModule,
            MatSelectModule,
            MatInputModule,
            MatNativeDateModule,
            DragDropModule,
            MatCardModule,
            MatStepperModule,
            HttpClientModule,
            MatExpansionModule,
            MatTableModule,
            MatIconModule,
            MatPaginatorModule,
            MatAutocompleteModule,
            MatDialogModule,
            MatSlideToggleModule,
            MatDividerModule,
            MatProgressBarModule,
            MatSliderModule,
            MatSortModule,
            MatTabsModule,
        ],
    exports:
        [
            MatProgressSpinnerModule,
            MatMenuModule,
            MatButtonModule,
            ReactiveFormsModule,
            FormsModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatRadioModule,
            MatSelectModule,
            MatInputModule,
            MatNativeDateModule,
            DragDropModule,
            MatCardModule,
            MatStepperModule,
            HttpClientModule,
            MatExpansionModule,
            MatTableModule,
            MatIconModule,
            MatPaginatorModule,
            MatAutocompleteModule,
            MatDialogModule,
            MatSlideToggleModule,
            MatProgressBarModule,
            MatSliderModule,
            MatSortModule,
            MatTabsModule,
        ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
    bootstrap: []
})
export class SharedModule { }
