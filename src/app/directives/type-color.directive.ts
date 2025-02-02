import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[eyTypeColor]',
})
export class TypeColorDirective implements OnChanges{

  @Input('type') type!: string;

  private colors: { [key: string]: string } = {
    fire: 'red',
    water: 'blue',
    grass: 'green',
    electric: 'gold',
    normal: 'gray',
    psychic: 'purple',
    fight: 'brown',
    poison: 'violet',
    ground: 'saddlebrown',
    flying: 'skyblue'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.cambiarColorTexto();
    }
  }

  private cambiarColorTexto(): void {
    const color = this.colors[this.type.toLowerCase()] || 'black';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }

}
