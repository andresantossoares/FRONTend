export interface FormaPagamento{
    fId: number
    descricao: string
    tipo: string
    numero_parcelas: number
    dias_entre_parcelas: number
    permite_troco: string    
    taxa_percentual:number
    ativo:string

}