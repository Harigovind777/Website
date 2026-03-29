import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { calculateAge } from '@/lib/utils';

interface RegistrationData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  age: number;
  isEligible: boolean;
  registeredAt: string;
}

const dataFile = path.join(process.cwd(), 'public', 'registrations.json');

const readData = async (): Promise<RegistrationData[]> => {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeData = async (data: RegistrationData[]): Promise<void> => {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
};

export async function POST(request: NextRequest) {
  try {
    const { name, dateOfBirth, gender, address, city, state, zipCode, phoneNumber, email } =
      await request.json();

    if (!name || !dateOfBirth || !gender || !address || !city || !state || !zipCode || !phoneNumber || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const age = calculateAge(dateOfBirth);
    const isEligible = age >= 18;

    if (!isEligible) {
      return NextResponse.json(
        { error: 'You must be at least 18 years old to register', age, isEligible },
        { status: 400 }
      );
    }

    const data = await readData();
    const newRegistration: RegistrationData = {
      id: Date.now().toString(),
      name,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      email,
      age,
      isEligible,
      registeredAt: new Date().toISOString(),
    };

    data.push(newRegistration);
    await writeData(data);

    return NextResponse.json(
      { success: true, message: 'Registration successful', data: newRegistration },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
