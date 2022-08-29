export class ScheduleShiftModel
{
    scheduleShiftId: number = 0;
    subject?: string;
    description? : string;
    startTime? : Date;
    endTime? : Date;
    personId? : number;
    scheduleId? : number;
    areaId? : number;
    locationId? : number;
    isActive? : boolean
    isDeleted? : boolean;
    geoLocationStart? : string;
    geoLocationEnd?: string;
    created? : Date;
    updated? : Date;
    deleted? : Date;
}
