// To allocate all the interfaces in one file
export interface IInforCard {
    id: number;
    title: string;
    description: string;
}

export enum UserTypes {
    administrador = 'Administrator',
    supervisor = 'Supervisor',
    vendedor = 'Vendedor',
}

export interface IUserInfo {
    key: string;

    first_name: string;
    mail: string;
    username: string;
    password: string;
    user_type: UserTypes;
}

export interface IClienteInfo {
    key: string;

    first_name: string;
    nit: string;
    telephone: string;
    address: string;
}

export interface IProveedor {
    key: string;

    proveedor: string;
    contacto: string;
    telephone: string;
    address: string;
}

export interface IProducto {
    key: string;

    proveedor: string;
    proveedor_name: string;
    producto: string;
    precio: number;
    cantidad: number;
}

export interface IVenta {
    key: string;

    cliente: IClienteInfo;
    vendedor: IUserInfo | any;

    items: Array<IProducto>;

    subtotal: number;
    iva: number;
    total: number;
}
