# Frontend Routing & User Flow

```mermaid
flowchart LR
    Start[App Load]

    Start -->|not logged in| Login[LoginPage]
    Start -->|not logged in| Signup[SignupPage]

    Login -->|success| Home[HomePage]
    Signup -->|success| Home[HomePage]

    Home --> ViewCheat[CheatPage]
    Home --> NewCheat["CheatForm - New"]

    ViewCheat --> EditCheat["CheatForm - Edit"]
    EditCheat --> Home
    NewCheat --> Home
```
