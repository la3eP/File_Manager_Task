export const args = () => {
    const userInputArgs = process.argv.slice(2);
  
    const cliArguments = userInputArgs.reduce((acc, args) => {
      const [key, value] = args.split('=');
  
      if (value && key.startsWith('--')) {
        const transformedArgs = key.slice(2);
        const map = new Map([[transformedArgs, value]]);
        acc.push(Object.fromEntries(map));
      }
      return acc;
    }, []);
  
    return cliArguments;
  };