import * as React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Slot component for composition pattern.
 * Merges props and refs from the Slot to its immediate child.
 * Inspired by Radix UI's Slot implementation.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const childProps = (children.props || {}) as Record<string, any>;
    return React.cloneElement(children, {
      ...mergeProps(slotProps, childProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    } as any);
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});

Slot.displayName = 'Slot';

/**
 * Merges props, handling event handlers and className specially.
 */
function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      // Merge event handlers
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      // Merge styles
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue,
      };
    } else if (propName === 'className') {
      // Merge classNames
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

/**
 * Composes multiple refs into a single ref callback.
 */
function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}
