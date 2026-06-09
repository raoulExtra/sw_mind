export interface CliArgs {
  db?: string;
}

export function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {};
  
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--db' || argv[i] === '-d') {
      if (i + 1 < argv.length) {
        args.db = argv[i + 1];
        i++;
      }
    }
  }
  
  return args;
}