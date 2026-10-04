import React from 'react';
import AccessDenied from '../components/AccessDenied';
import type { WithAuthProps } from '../types';

export function withAuthorization<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  type ExternalProps = Omit<P, keyof WithAuthProps> & WithAuthProps;
  type ComponentRef = React.ComponentRef<typeof WrappedComponent>;

   const ComponentWithAuth = React.forwardRef<ComponentRef, Record<string, unknown>>((props, ref) => {
    const typedProps = props as ExternalProps;
    const { currentUser } = typedProps;

    if (!currentUser || !currentUser.roles) {
      return <AccessDenied />;
    }

    const hasPermission = currentUser.roles.some((role: string) =>
      allowedRoles.includes(role)
    );

    if (!hasPermission) {
      return <AccessDenied />;
    }

    const combinedProps = { ...typedProps, ref } as unknown as P;
    return <WrappedComponent {...combinedProps} />;
  });

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithAuth.displayName = `WithAuthorization(${wrappedComponentName})`;

  return ComponentWithAuth as unknown as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ExternalProps> & React.RefAttributes<ComponentRef>
  >;
}
