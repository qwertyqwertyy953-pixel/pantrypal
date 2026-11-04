// Some hosts are set up with the publish folder named after the service ("pantrypal").
// Mirror the build there so both "dist" and "pantrypal" work as the publish directory.
import { cpSync, rmSync, existsSync } from 'node:fs';
if (existsSync('dist')) {
  rmSync('pantrypal', { recursive: true, force: true });
  cpSync('dist', 'pantrypal', { recursive: true });
  console.log('mirrored dist -> pantrypal');
}
