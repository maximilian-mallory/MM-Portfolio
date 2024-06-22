import styled from 'styled-components';

const Button = styled.button`
    width: 95%;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    margin: .4rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    background-color: ${props=>props.color};
    color: #fff;
    
`

export const LinkButton = ({
    buttonText,
    url,
    color
}) => {
    return <Button onClick={()=>window.open(url, '_blank')} color={color}>{buttonText}</Button>
}