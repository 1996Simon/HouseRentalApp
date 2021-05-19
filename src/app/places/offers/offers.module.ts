import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPage } from './offers.page';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OffersPageRoutingModule } from './offers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPageRoutingModule
  ],
  declarations: [OffersPage, OfferItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OffersPageModule {}
