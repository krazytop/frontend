import {Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2} from '@angular/core';
import {LOLItemOverlayModel} from "../../../model/lol/lol-item-overlay.model";
import {LOLOverlayService} from "../../../service/lol/lol-overlay.service";
import {LOLItemNomenclature} from "../../../model/lol/nomenclature/lol-item.nomenclature";
import {LOLNomenclature} from "../../../model/lol/nomenclature/lol.nomenclature";

@Component({
  selector: 'lol-item-overlay',
  templateUrl: './lol-item-overlay.component.html',
  styleUrls: ['./lol-item-overlay.component.css']
})
export class LolItemOverlayComponent implements OnDestroy, OnChanges {

  @Input() itemOverlay!: LOLItemOverlayModel;
  item!: LOLNomenclature;

  private readonly clickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private overlayService: LOLOverlayService) {
    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.overlayService.hideItem();
      }
    });
  }

  ngOnChanges() {
    this.item = this.itemOverlay.item!;
  }

  get description() {
    if ('plainText' in this.item) {
      return this.item.plainText;
    } else {
      return this.item.description;
    }
  }

  ngOnDestroy() {
    if (this.clickListener) this.clickListener();
  }

  protected readonly console = console;
}
