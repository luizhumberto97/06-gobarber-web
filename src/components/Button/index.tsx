import React, {ButtonHTMLAttributes} from 'react';
import {Container} from './styles';

//interface ButtonProps extends ButtonHTMLAttributes <HTMLButtonElement>{}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; /* Quando é vazio */

//Conteudo do botão vai pegar através da children  e o restante no ...rest
const Button: React.FC<ButtonProps> = ({children, ...rest}) => (
  <Container type="button" {...rest}>
   {children}
  </Container>
)

export default Button;
