import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective implements OnInit {
  @Input('appMask') maskType: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Aplicar máscara inicial se houver valor
    if (this.el.nativeElement.value) {
      let value = this.el.nativeElement.value.replace(/\D/g, '');
      if (this.maskType === 'estado') {
        value = this.el.nativeElement.value.replace(/[^A-Za-z]/g, '').toUpperCase();
      }
      this.applyMask(value, null);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (this.maskType === 'estado') {
      value = event.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
    }
    this.applyMask(value, event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (this.maskType === 'estado') {
      value = event.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
    }
    this.applyMask(value, event);
  }

  private applyMask(value: string, event: any) {
    let maskedValue = '';

    switch (this.maskType) {
      case 'cpf':
        maskedValue = this.maskCPF(value);
        break;
      case 'cnpj':
        maskedValue = this.maskCNPJ(value);
        break;
      case 'cep':
        maskedValue = this.maskCEP(value);
        break;
      case 'telefone':
        maskedValue = this.maskTelefone(value);
        break;
      case 'celular':
        maskedValue = this.maskCelular(value);
        break;
      case 'estado':
        maskedValue = this.maskEstado(value);
        break;
      default:
        maskedValue = value;
    }

    // Atualizar o valor do input
    this.el.nativeElement.value = maskedValue;
    
    // Atualizar o ngModel através do evento
    if (event && event.target) {
      event.target.value = maskedValue;
    }
    // Sempre disparar evento de input para atualizar o ngModel
    const inputEvent = new Event('input', { bubbles: true });
    this.el.nativeElement.dispatchEvent(inputEvent);
  }

  private maskCPF(value: string): string {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4').substring(0, 14);
    }
  }

  private maskCNPJ(value: string): string {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 5) {
      return value.replace(/(\d{2})(\d+)/, '$1.$2');
    } else if (value.length <= 8) {
      return value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length <= 12) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    } else {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5').substring(0, 18);
    }
  }

  private maskCEP(value: string): string {
    if (value.length <= 5) {
      return value;
    } else {
      return value.replace(/(\d{5})(\d+)/, '$1-$2').substring(0, 9);
    }
  }

  private maskTelefone(value: string): string {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{2})(\d+)/, '($1) $2');
    } else {
      return value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3').substring(0, 14);
    }
  }

  private maskCelular(value: string): string {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 7) {
      return value.replace(/(\d{2})(\d+)/, '($1) $2');
    } else {
      return value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3').substring(0, 15);
    }
  }

  private maskEstado(value: string): string {
    // Apenas permite letras e converte para maiúsculas
    return value.replace(/[^A-Za-z]/g, '').toUpperCase().substring(0, 2);
  }
}

