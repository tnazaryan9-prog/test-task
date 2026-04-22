/* Здесь нельзя использовать тип `unknown` вместо `any`, иначе сломается утверждение типов, которое даёт функция `isReactComponent`. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

type ReactComponent = React.FC<any> | React.ComponentClass<any, any>;

/**
 * Проверяет, является ли значение функциональным компонентом.
 */
export const isFunctionComponent = (component: any): component is React.FC<any> => {
    return typeof component === "function";
};

/**
 * Проверяет, является ли значение компонентом-классом.
 */
export const isClassComponent = (component: any): component is React.ComponentClass<any, any> => {
    return typeof component === "function" && component.prototype && (!!component.prototype.isReactComponent || !!component.prototype.render);
};

/**
 * Проверяет, является ли значение компонентом с forwardRef.
 */
export const isForwardRefComponent = (component: any): component is React.ForwardRefExoticComponent<any> => {
    return typeof component === "object" && component !== null && component.$$typeof.toString() === "Symbol(react.forward_ref)";
};

/**
 * Проверяет, является ли значение допустимым React-компонентом.
 */
export const isReactComponent = (component: any): component is ReactComponent => {
    return isFunctionComponent(component) || isForwardRefComponent(component) || isClassComponent(component);
};
