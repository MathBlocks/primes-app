import React, { ChangeEvent, useMemo } from 'react'
import Select, { Options, OnChangeValue } from 'react-select'
import {
  FieldInputProps,
  FieldProps,
  Field,
  FormikHandlers,
  useFormikContext,
} from 'formik'
import styled from 'styled-components'

interface Option<T> {
  label: string
  value: T
}

interface FormikSelectProps<T> extends FieldProps {
  options: Options<Option<T>>
  isMulti?: boolean
}

const StyledSelect = styled(Select)`
  font-size: 1.5rem;
  max-width: 12rem;
  > div {
    background: white;
    border: 1px white solid;
    color: black;
    border-radius: 1rem;
  }
`

const StyledOutput = styled(Field)`
  font-size: 1.5rem;
  max-width: 12rem;
  > div {
    background: black;
    border: 1px white solid;
    color: white;
    border-radius: 1rem;
  }
`

export const BreedingOutput = <T extends unknown>({
  placeholder,
  name,
  value,
  onBlur,
}: FieldInputProps<T> & {
  placeholder?: string
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value)
    setFieldTouched(name)
    setFieldValue(name, parsedValue)
  }
  return (
    <StyledOutput
      type="number"
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  )
}

export const BreedingSelect = ({
  field,
  form,
  options,
  placeholder,
}: FormikSelectProps<number> & {
  placeholder?: string
}) => {
  const onChange = (
    option: OnChangeValue<
      Option<number> | Option<number>[],
      boolean
    >,
  ) => {
    const value = (option as Option<number>).value
    form.setFieldValue(field.name, value)
    form.setFieldTouched('desiredOutput', false)
    const otherField =
      field.name === 'tokenId' ? 'otherTokenId' : 'tokenId'
    const otherValue = form.values[otherField] as number | undefined
    if (value && otherValue) {
      form.setFieldValue('desiredOutput', value * otherValue)
      form.setFieldTouched('desiredOutput', false)
    }
  }

  const value = options.length
    ? options.find((option) => option.value === field.value)
    : field.value

  return (
    <StyledSelect
      name={field.name}
      value={value}
      options={options}
      onChange={onChange as never}
      placeholder={placeholder}
      isMulti={false}
    />
  )
}
