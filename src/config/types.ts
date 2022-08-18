export interface FieldAttributes {
    id: string
    title: string
    type: string
    placeholder?: string
    required?: string
    options?: []
    pattern?: {
        value: string | RegExp
        message: string
    }
    rows?: number
}
