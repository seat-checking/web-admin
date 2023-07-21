import styled from 'styled-components';
import checkBoxImg from 'assets/icons/checkbox.svg';
import checkedBoxImg from 'assets/icons/checkedbox.svg';

export const InputCheckBoxWrapper = styled.div`
  max-width: 67.5rem;
`;

export const Input = styled.input`
appearance: none;
border: 0.15rem solid gainsboro;
border-radius: 3.2rem;
width: 2.4rem;
height: 2.4rem;
cursor: pointer;
background-image: url(${checkBoxImg});
background-size: 100% 100%;
background-position: 50%;
background-repeat: no-repeat;

&:checked {
  border-color: transparent;
  background-image: url(${checkedBoxImg});
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: #ff8d4e;`;
