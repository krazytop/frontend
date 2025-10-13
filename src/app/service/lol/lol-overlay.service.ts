import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {LOLItemOverlayModel} from "../../model/lol/lol-item-overlay.model";
import {LOLNomenclature} from "../../model/lol/nomenclature/lol.nomenclature";

@Injectable({ providedIn: 'root' })
export class LOLOverlayService {

  public itemOverlay: LOLItemOverlayModel = new LOLItemOverlayModel();

  showItem(item: LOLNomenclature, top: number, left: number) {
    of(item).pipe(delay(10)).subscribe(() => {
      this.itemOverlay.top = top;
      this.itemOverlay.left = left;
      this.itemOverlay.item = item;
    });
  }

  hideItem() {
    this.itemOverlay.item = undefined;
  }

}
