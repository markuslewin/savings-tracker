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

## Deployment

The web app deploys to Netlify.

- `NETLIFY_AUTH_TOKEN`

```sh
aspire deploy --non-interactive
```
