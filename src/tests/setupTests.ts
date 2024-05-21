import * as matchers from '@testing-library/jest-dom/matchers';
import {cleanup} from "@testing-library/react"; 
import { expect } from 'vitest';

afterEach(() => {  
    cleanup()  
})

expect.extend(matchers);