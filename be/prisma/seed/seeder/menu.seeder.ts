export const menuSeeder = [
  {
    id: "0199abf6-c7e8-7b14-bbe2-faea6195c16d",
    name: "System Management",
    nameKr: "시스템",
    depth: 0,
    parentId: null,
    isActive: true
  },
  {
    id: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    name: "Systems",
    nameKr: "시스템",
    depth: 1,
    parentId: '0199abf6-c7e8-7b14-bbe2-faea6195c16d',
    isActive: true
  },
  {
    id: "b9446bc7-0645-41a8-b5b1-a2de10954289",
    name: "System Code",
    nameKr: "시스템 코드",
    depth: 2,
    parentId: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    isActive: true
  },
  {
    id: "576be21e-43e0-4ff2-8876-607c98a544bf",
    name: "Code Registration",
    nameKr: "코드 등록",
    depth: 3,
    parentId: "b9446bc7-0645-41a8-b5b1-a2de10954289",
    isActive: true
  },
  {
    id: "9ce2871b-cd7f-4e68-9432-484ed54b9ead",
    name: "Code Registration - 2",
    nameKr: "코드 등록 - 2",
    depth: 2,
    parentId: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    isActive: true
  },
  {
    id: "74f96cbc-768c-435d-927c-8d61f361699e",
    name: "Properties",
    nameKr: "속성",
    depth: 2,
    parentId: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    isActive: true
  },
  {
    id: "d10859e1-cc28-4054-9200-9a1e9501299a",
    name: "Menus",
    nameKr: "메뉴",
    depth: 2,
    parentId: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    isActive: true
  },
  {
    id: "2d0e9bf7-0bcb-4c2d-873f-61aa88325cc6",
    name: "Menu Registration",
    nameKr: "메뉴 등록",
    depth: 3,
    parentId: "d10859e1-cc28-4054-9200-9a1e9501299a",
    isActive: true
  },
  {
    id: "817efb03-7a83-499d-b31a-df86d97c13f0",
    name: "API List",
    nameKr: "API 목록",
    depth: 2,
    parentId: "6020cf55-e684-492e-aca0-0b0acd9b16ce",
    isActive: true
  },
  {
    id: "2855b3b5-3855-4353-a053-5f11124c00d5",
    name: "API Registration",
    nameKr: "API 등록",
    depth: 3,
    parentId: "817efb03-7a83-499d-b31a-df86d97c13f0",
    isActive: true
  },
  {
    id: "fb8d9c06-a472-4404-ba82-a47e873c9335",
    name: "API Edit",
    nameKr: "API 수정",
    depth: 3,
    parentId: "817efb03-7a83-499d-b31a-df86d97c13f0",
    isActive: true
  },
  {
    id: "d6e4427b-265a-4fc3-8577-ddd13bddc0bd",
    name: "Users & Groups",
    nameKr: "사용자 및 그룹",
    depth: 1,
    parentId: '0199abf6-c7e8-7b14-bbe2-faea6195c16d',
    isActive: true
  },
  {
    id: "a8a7a1ea-c82b-41d7-99f5-feb3523f6393",
    name: "Users",
    nameKr: "사용자",
    depth: 2,
    parentId: "d6e4427b-265a-4fc3-8577-ddd13bddc0bd",
    isActive: true
  },
  {
    id: "215c115b-bc1c-4c1d-9c66-e61411d8a6aa",
    name: "User Account Registration",
    nameKr: "사용자 계정 등록",
    depth: 3,
    parentId: "a8a7a1ea-c82b-41d7-99f5-feb3523f6393",
    isActive: true
  },
  {
    id: "7f334812-6dd0-424a-98c1-6833b70ed175",
    name: "Groups",
    nameKr: "그룹",
    depth: 2,
    parentId: "d6e4427b-265a-4fc3-8577-ddd13bddc0bd",
    isActive: true
  },
  {
    id: "fa46c3a2-a68f-40ec-9226-3a2b7a5f0330",
    name: "User Group Registration",
    nameKr: "사용자 그룹 등록",
    depth: 3,
    parentId: "7f334812-6dd0-424a-98c1-6833b70ed175",
    isActive: true
  },
  {
    id: "34e9c754-80a0-4568-a95a-2e9555580a9e",
    name: "사용자 승인",
    nameKr: "사용자 승인",
    depth: 2,
    parentId: 'd6e4427b-265a-4fc3-8577-ddd13bddc0bd',
    isActive: true
  },
  {
    id: "e571236f-1c9d-486f-b77a-d59a2e163533",
    name: "사용자 승인 상세",
    nameKr: "사용자 승인 상세",
    depth: 3,
    parentId: "34e9c754-80a0-4568-a95a-2e9555580a9e",
    isActive: true
  },
]
