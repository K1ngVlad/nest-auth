import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ActivateService } from './activate.service';

@Controller('activate')
export class ActivateController {
  constructor(private readonly activateService: ActivateService) {}

  @Get(':link')
  @Redirect(process.env.CLIENT_URL)
  async activate(@Param('link') link: string): Promise<void> {
    try {
      await this.activateService.activate(link);
    } catch (error) {
      console.error(error);
    }
  }
}
