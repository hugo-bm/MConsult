// Interface para o corpo de requisição de criação de usuário
export interface CreateUserRequestBody {
  name: string;
  password: string;
  email: string;
  phone: string;
  birth_date: string;
}

// Interface para o corpo de requisição de atualização de usuário
export interface UpdateUserRequestBody {
  name: string;
  email: string;
  phone: string;
  birth_date: string;
}

// Interface para o corpo de requisição de criação de funcionario
export interface CreateEmployeeRequestBody {
  name: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  user_name: string;
}

// Interface para o corpo de requisição de atualização de funcionario
export interface UpdateEmployeeRequestBody {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  user_name: string;
}

// Interface para o corpo de requisição de atualização de medico
export interface UpdateDoctorRequestBody {
  id: string;
  name: string;
  password: string;
  specialty: string;
  icon: string;
  services: []; // precisa atualizar
  user_name: string;
}

// Interface para o corpo de requisição de criação de médico
export interface CreateDoctorRequestBody {
  name: string;
  password: string;
  specialty: string;
  icon: string;
  services: []; //precisa atualizar
  user_name: string;
}

// Interface para o corpo de requisição de atualização de serviço
export interface UpdateServiceRequestBody {
  id: number;
  service: string;
  description: string;
}

// Interface para o corpo de requisição de atribuição de serviço ao médico
export interface CreateDoctorServiceRequestBody {
  id_service: string;
  id_doctor: string;
  price: number;
}

// Interface para o corpo de requisição de atualização do preço do serviço
export interface UpdateDoctorServiceRequestBody {
  id: number;
  price: number;
}

// Interface para o corpo de requisição de criação de serviço
export interface CreateServiceRequestBody {
  service: string;
  description: string;
}

// Interface para o corpo de requisição de atualização da reserva
export interface UpdateAppointmentRequestBody {
  id: string;
  date: string;
  time: string;
}

// Interface para o corpo de requisição de criação de serviço
export interface CreateAppointmentBody {
  id_doctor: string;
  id_service: string;
  id_user: string;
  date: string;
  time: string;
}

// Interface para o corpo de requisição de login
export interface LoginUserRequestBody {
  email: string;
  password: string;
}

// Interface para definir headers personalizados na requisição, se necessário
export interface CustomHeaders {
  Authorization?: string;
  'X-Custom-Header'?: string;
}

// Interface para resposta da API
export interface ApiResponse {
  statusCode: number;
  message: string;
  response_date: string;
}
export interface ApiResponseWithData<T> {
  statusCode: number;
  message: string;
  response_date: string;
  data: T;
}
