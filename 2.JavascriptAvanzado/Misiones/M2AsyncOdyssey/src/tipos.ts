// forma de los datos tal y como llegan de la api
export interface PilotoApi {
    position?: string;
    points?: string;
    wins?: string;
    Driver?: {
        driverId?: string;
        permanentNumber?: string;
        code?: string;
        givenName?: string;
        familyName?: string;
        nationality?: string;
    };
    Constructors?: {
        constructorId?: string;
        name?: string;
    }[];
}

export interface RespuestaApi {
    MRData?: {
        StandingsTable?: {
            StandingsLists?: {
                DriverStandings?: PilotoApi[];
            }[];
        };
    };
}

// forma limpia que usa el resto de la aplicacion
export interface Piloto {
    id: string;
    posicion: number;
    nombre: string;
    codigo: string;
    numero: string;
    nacionalidad: string;
    escuderia: string;
    escuderiaId: string;
    puntos: number;
    victorias: number;
}

export interface Escuderia {
    nombre: string;
    id: string;
    puntos: number;
    pilotos: number;
}
