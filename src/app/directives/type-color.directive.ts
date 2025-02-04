import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[eyTypeColor]',
})
export class TypeColorDirective implements OnInit{

  @Input('eyTypeColor') type: string = 'fire';

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

  constructor(private el: ElementRef) {
  }
  ngOnInit(): void {
    this.updateColor();
  }


  private updateColor(): void {
    const color = this.colors[this.type.toLowerCase()] || 'black';
    console.log(color);
    this.el.nativeElement.style.color = color;
  }

}
