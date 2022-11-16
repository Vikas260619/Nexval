import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getTeams() {
    return [
      {
        id: '1',
        name: 'test 1',
      },
      {
        id: '2',
        name: 'test 1',
      },
      {
        id: '3',
        name: 'test 1',
      },
      {
        id: '4',
        name: 'test 1',
      },
      {
        id: '5',
        name: 'test 1',
      },
      {
        id: '6',
        name: 'test 1',
      },
    ].slice(0, Math.floor(Math.random() * 4));
  }

  getDepartmentsByParentId(id: string) {
    return this.department().slice(0, Math.floor(Math.random() * 2));
  }

  getDepartmentAll() {
    return this.department().slice(0, 2);
  }

  department() {
    return [
      {
        id: '1',
        name: 'Dept 1',
      },
      {
        id: '2',
        name: 'Dept 2',
      },
      {
        id: '3',
        name: 'Dept 3',
      },
      {
        id: '4',
        name: 'Dept 4',
      },
    ];
  }
}
