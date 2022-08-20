using AutoMapper;
//using AutoMapper.Extensions.Microsoft.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ShiftWork.Backend.Data;
using ShiftWork.Backend.DTOs;
using ShiftWork.Backend.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ShiftWorkContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ShiftWorkContext") ?? throw new InvalidOperationException("Connection string 'ShiftWorkContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAutoMapper(typeof(Program));
//builder.Services.Add(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    options =>
    {
        options.WithOrigins("*");
    });
});
var app = builder.Build();

//var configuration = new MapperConfiguration(cfg =>
//{
//    cfg.CreateMap<Area, AreaDto>();
//    cfg.CreateMap<Location, LocationDto>();
//});
//// only during development, validate your mappings; remove it before release
//configuration.AssertConfigurationIsValid();
//// use DI (http://docs.automapper.org/en/latest/Dependency-injection.html) or create the mapper yourself
//var mapper = configuration.CreateMapper();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();
    //app.UseMigrationsEndPoint();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    var context = services.GetRequiredService<ShiftWorkContext>();
//    context.Database.EnsureCreated();
//    //DbInitializer.Initialize(context);
//}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
