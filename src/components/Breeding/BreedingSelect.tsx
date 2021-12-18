import React, { ReactNode } from 'react'
import Select, { Options, OnChangeValue } from 'react-select'
import { FieldInputProps, FieldProps, Field } from 'formik'
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
  #react-select-3-listbox,
  #react-select-5-listbox {
    top: 0;
    left: 100%;
    margin: 0;
    overflow: hidden;
    > * {
      padding: 0;
      > * {
        padding: 0.35rem 1rem;
      }
    }
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
  // TODO enable this field; update the options for the other fields
  // const { setFieldValue, setFieldTouched } = useFormikContext()
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const parsedValue = parseInt(event.target.value)
  //   setFieldTouched(name)
  //   setFieldValue(name, parsedValue)
  // }
  return (
    <StyledOutput
      type="number"
      name={name}
      value={value}
      disabled
      // onChange={handleChange}
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
  noOptionsMessage,
}: FormikSelectProps<number> & {
  placeholder?: string
  noOptionsMessage?(obj: { inputValue: string }): ReactNode
}) => {
  const onChange = (
    option: OnChangeValue<
      Option<number> | Option<number>[],
      boolean
    >,
  ) => {
    if (!option) {
      form.setFieldValue(field.name, '')
      return
    }
    const value = (option as Option<number>).value
    form.setFieldValue(field.name, value)
    const otherField =
      field.name === 'tokenId' ? 'otherTokenId' : 'tokenId'
    const otherValue = form.values[otherField] as number | undefined
    if (value && otherValue) {
      form.setFieldValue('desiredOutput', value * otherValue)
      form.setFieldTouched('desiredOutput', false)
    }
  }

  const value =
    options.find((option) => option.value === field.value) ??
    field.value

  return (
    <StyledSelect
      name={field.name}
      value={value}
      onInputChange={(value_, { action }) => {
        if (action !== 'input-change') return

        const parsed = parseInt(value_)
        if (!isFinite(parsed)) {
          onChange(null)
        } else if (parsed > 0 && parsed < 16384) {
          onChange({ label: value_, value: parsed })
        }
      }}
      controlShouldRenderValue
      options={options}
      onChange={onChange as never}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
      isMulti={false}
    />
  )
}
