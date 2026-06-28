# Savings Tracker

Prerequisites:

- [Node.js](https://nodejs.org/en/download)

```sh
# Aspire CLI
dotnet tool install --global Aspire.Cli
# EF Core CLI
dotnet tool install --global dotnet-ef
```

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
dotnet ef migrations add InitialCreate --project SavingsTracker.GoalDbManager/SavingsTracker.GoalDbManager.csproj
```

## Tests

### `Frontend`

```sh
cd SavingsTracker.Frontend
npm run test # Unit
npm run test:e2e # E2E
```

### `GoalService`

```sh
dotnet test
```
