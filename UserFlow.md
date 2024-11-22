```mermaid

flowchart TD
    A[Landing Page] --> B{¿Usuario quiere...?}
    
    %% Flujo de Búsqueda
    B -->|Buscar Viaje| C[Formulario de Búsqueda]
    C --> D[Ver Resultados]
    D --> E{¿Está logeado?}
    E -->|No| F[Modal Login/Registro]
    F --> G[Página Login]
    G -->|Login exitoso| H[Reservar Viaje]
    E -->|Sí| H
    
    %% Flujo de Oferta
    B -->|Ofrecer Viaje| I[Formulario de Oferta]
    I --> J{¿Está logeado?}
    J -->|No| K[Modal Login/Registro]
    K --> L[Página Login]
    L -->|Login exitoso| M[Publicar Viaje]
    J -->|Sí| M
    
    %% Flujo Informativo
    B -->|Conocer más| N[Página What is Carpooling]
    
    %% Estilos y Enlaces del Footer
    A --> O[Footer]
    O --> P[Términos y Condiciones]
    O --> Q[Política de Privacidad]
    O --> R[Soporte]
    
    %% Subgraph para el Hero Section
    subgraph Hero
    S[Mensaje Bienvenida]
    T[Descripción App]
    U[Imagen Carpooling]
    end
    
    %% Estilos
    classDef page fill:#f9f,stroke:#333,stroke-width:2px
    classDef decision fill:#ff9,stroke:#333,stroke-width:2px
    classDef action fill:#9f9,stroke:#333,stroke-width:2px
    
    class A,N,P,Q,R page
    class B,E,J decision
    class H,M action
