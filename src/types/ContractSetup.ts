export interface ContractDetails {
  name: string;
  address: string;
  abi: any;
  bytecode: any;
  sourceCode: string;
  args: any;
  txn: string;
}

export interface IFormInput {
  contractName: string;
  chain: string;
  withdraw: boolean;
  privacy: boolean;
  extendTime: boolean;
  emergencyTime?: number;
}

export interface IFormCreateSave {
  name: string;
  amount: string;
  type: string;
  months: number;
}
