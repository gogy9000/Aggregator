
export const required = (value: string) => (value ? undefined : 'Required')

export const mustBeNumber = (value: number) => (isNaN(value) ? 'Must be a number' : undefined)

export const minValue = (min: number) => (value: number) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

export const composeValidators = (...validators: any[]) => (value: string) =>
    validators.reduce((error, validator) => error || validator(value), undefined)