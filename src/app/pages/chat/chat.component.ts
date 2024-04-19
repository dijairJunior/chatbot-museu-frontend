import { Component } from '@angular/core';
import { MuseumComponent } from '../../icons/museum/museum.component';
import { ArrowLeftComponent } from '../../icons/arrow-left/arrow-left.component';
import { ChatSuggestionsComponent } from '../../components/chat-suggestions/chat-suggestions.component';
import { CommonModule } from '@angular/common';
import { Message } from '../../types/message.type';
import { ChatDialogComponent } from '../../components/chat-dialog/chat-dialog.component';
import { MessageService } from '../../services/message.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MuseumComponent,
    ArrowLeftComponent,
    ChatSuggestionsComponent,
    ChatDialogComponent
  ],

  providers: [
    MessageService
  ],

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent {
  messages: Message[] = JSON.parse(localStorage.getItem("messages") ?? "[]")

  constructor(private service: MessageService) {}

  updateLocalStoarage() {
    localStorage.setItem("messages", JSON.stringify(this.messages))
  }

  sendSuggestedQuestion(question: string){
    this.messages.push({
      type: 'request',
      message: question
    })

    this.updateLocalStoarage()
    this.sendMessage(question)
  }
  
  sendMessage(message: string) {
    this.service.send(message).subscribe({
      next: (body) => {
        this.messages.push({
          type: "response",
          message: body.response
        })
        this.updateLocalStoarage()
      }
    })
  }
}
