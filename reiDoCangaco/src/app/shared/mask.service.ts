import { Injectable } from '@angular/core';
import { Masks } from './masks.interfaces';
import { masks } from './masks.models';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  public masks: Masks = masks;

constructor() { }

private setMasks(): Masks {
  return this.masks;
}

}
