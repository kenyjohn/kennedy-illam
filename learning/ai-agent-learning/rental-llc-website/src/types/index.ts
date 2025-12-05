export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrls: string[];
    available: boolean;
    features: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Showing {
    id: string;
    propertyId: string;
    property?: {
        title: string;
        address: string;
        city: string;
        state: string;
    };
    name: string;
    email: string;
    phone: string;
    scheduledDate: string;
    scheduledTime: string;
    duration: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    notes?: string;
    createdAt?: string;
}

export interface Availability {
    id: string;
    propertyId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDuration: number;
    isActive: boolean;
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: string;
}

export interface ApplicationForm {
    propertyId: string;
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        ssn: string; // Last 4 digits
    };
    residenceHistory: {
        currentAddress: string;
        city: string;
        state: string;
        zipCode: string;
        moveInDate: string;
        landlordName: string;
        landlordPhone: string;
        reasonForLeaving: string;
    };
    employmentInfo: {
        employerName: string;
        jobTitle: string;
        monthlyIncome: number;
        supervisorName: string;
        supervisorPhone: string;
        employmentLength: string;
    };
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    pets: {
        hasPets: boolean;
        details: string;
    };
    background: {
        hasEvictions: boolean;
        hasFelonies: boolean;
        details: string;
    };
}

export interface Application {
    id: string;
    propertyId: string;
    property?: {
        title: string;
        address: string;
        city: string;
        state: string;
    };
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
    // Add other fields as needed
}
