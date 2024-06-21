import { Module, forwardRef } from "@nestjs/common";
import { CatsModule } from "./cats.module";

@Module({
    imports: [forwardRef(() => CatsModule)],
  })
  export class CommonModule {}