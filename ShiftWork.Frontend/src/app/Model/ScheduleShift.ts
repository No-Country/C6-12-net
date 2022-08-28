export class ScheduleShiftModel
{
    ScheduleShiftId: number = 0;
    Subject?: string;
    Description? : string;
    StartTime? : Date;
    EndTime? : Date;
    PersonId? : number;
    ScheduleId? : number;
    AreaId? : number;
    LocationId? : number;
    IsActive? : boolean
    IsDeleted? : boolean;
    GeoLocationStart? : string;
    GeoLocationEnd?: string;
    Created? : Date;
    Updated? : Date;
    Deleted? : Date;
}
