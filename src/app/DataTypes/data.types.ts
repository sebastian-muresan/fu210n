//Projects Table
export interface MyProjectsTableItem {
    idProject: number;
    projectName: string;
    projectDescription: string
}

export interface NewProjectDialogData {
    projectName: string,
    projectDescription: string
    /*email: string,
    phoneNr: string,
    city: string,
    address: string,
    startDate: Date,
    endDate: Date,
    budget: number,*/
}

export interface NewMaterialDialogData {
    materialName: string,
    materialManufacturer: string,
    materialCode: string,
    materialDescription: string,
    materialPlace: string,
    materialLink: string,
    materialImage: string,
    materialQuantity: number,
    materialUom: string,
    materialPricePerUom: number,
    materialZoneName: string,
    materialZoneId: number

}
export interface NewZoneDialogData {
    newZoneName: string;
}

export interface ProjectMaterialsItem {

    id: number;
    manufacturer: string,
    name: string;
    code: string,
    description: string,
    place: string,
    link: string,
    image: string,
    quantity: string,
    uom: string,
    price: number,
    total_price: number,
    zoneId: number,
    isZone: boolean,
    isTotal: boolean
}