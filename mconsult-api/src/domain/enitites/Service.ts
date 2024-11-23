export class Service {
    public id_service: number | undefined    
    public service: string
    public desc: string
    constructor(
        id: number | undefined,
        service: string,
        desc: string
    ){
        this.id_service = id;
        this.service = service;
        this.desc = desc;
    }
    public toJSON() {
        return {
          id: this.id_service,
          service_name: this.service,
          description: this.desc,
        };
      }
}