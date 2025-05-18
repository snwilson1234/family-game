# File Structure Standards

## 1. Use Client Statment
There shall be a 'use client' statement at the top of components that use client-side hooks like useEffect, useState, etc.

There shall not be a 'use client' statment in components that do not use these hooks.
## 2. Imports
For all files, imports shall be in the following order:
1. Core React and Libraries
2. Third-Party Libraries
3. Local Modules
4. CSS Files
5. Assets (Images, etc.)

There shall be **TWO** newlines between imports and code for the file.

In files with no imports, there shall be **ONE** newline before any code within the file.

## 3. Code
For now, there shall be "one thing per file".