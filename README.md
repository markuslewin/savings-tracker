# Savings Tracker

Prerequisites:

- [Aspire](https://aspire.dev/get-started/prerequisites/)
- [Node.js](https://nodejs.org/en/download)

## Development

### Run

```sh
aspire run
```

### Watch

```sh
dotnet watch --project SavingsTracker.AppHost/SavingsTracker.AppHost.csproj
```

### Debug

Launch via `.vscode/launch.json`.

### Add migration

```sh
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate --project SavingsTracker.GoalDbManager/SavingsTracker.GoalDbManager.csproj
```
