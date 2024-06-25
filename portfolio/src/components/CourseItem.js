import styled from "styled-components";

import { useState, useEffect, Children } from "react";

const StyledCourseItem = styled.p`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalBody = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
`;

export const CourseItem = ({ course }) => {

    const [shouldShowModal, setShouldShowModal] = useState(false)

    const { name, description } = course;

    return  (
        <>
        <Modal 
            shouldShow={shouldShowModal}
            onRequestClose={()=>setShouldShowModal(false)}
        >
            <p>{description}</p>
        </Modal>
        <StyledCourseItem onClick={() => setShouldShowModal(!shouldShowModal)} >{name}</StyledCourseItem>
        </>
    )
}

export const RegularList = ({ 
    items, 
    resourceName,
    itemComponent: ItemComponent,
}) => {
    return (
        <>
        {items.map((item, i) => (
            <ItemComponent 
            key={i} 
            {...{ [resourceName]: item }}
            />
        ))}
        </>
    )
}

export const Modal = ({ shouldShow, onRequestClose, children }) => {

    return shouldShow ? (
            <ModalBackground onClick={onRequestClose}>
            <ModalBody onClick={e => e.stopPropagation()}>
                <button onClick={onRequestClose}>Close</button>
                {children}
            </ModalBody>
            </ModalBackground>
    ) : null;     
}

