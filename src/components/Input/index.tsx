import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import {IconBaseProps} from 'react-icons';
import {FiAlertCircle} from 'react-icons/fi';
import { useField} from '@unform/core';



import { Container, Error } from './styles';

// O Que o input vai receber? -> todas as propriedades do HTML -> por isso vamos criar uma interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string; /* Nome Obrigatorio */
  icon: React.ComponentType<IconBaseProps>;

}


const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null); // referencia

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false); // Verificar se está preenchido

  const {fieldName, defaultValue, error, registerField} = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  },[])



  // Quando declaramos a função em cima da outra, ela sempre é recriada
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    //Se tem algum valor
    setIsFilled(!!inputRef.current?.value); // Transformado em Boleano -> se estiver valor -> true se for vazio  = false

  },[]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  },[fieldName, registerField]);


  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>

    {Icon && <Icon size={20} />}
    <input
    onFocus={handleInputFocus}
    onBlur={handleInputBlur}
    defaultValue={defaultValue}
     ref={inputRef}
      {...rest} />

      {error && (
      <Error title={error}>
        <FiAlertCircle color="#c53030" size={20} />
      </Error>

      )}
  </Container>
  );

  };

export default Input;
