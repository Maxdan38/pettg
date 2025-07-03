from telegram import Update, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [KeyboardButton("Каталог")],
        [KeyboardButton("О боте")],
    ]
    
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text(
        "Привет! Я бот vadick. Выберите команду:",
        reply_markup=reply_markup,
    )

async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Этот бот создан для заказа кроссовок.")

async def catalog_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    # Создаем кнопку для открытия мини-приложения
    mini_app_button = KeyboardButton(
        text="Открыть магазин",
        web_app=WebAppInfo(url="https://Maxdan38.io/pettg/")  # Замените на реальный URL
    )
    
    # Создаем клавиатуру только с этой кнопкой
    keyboard = [[mini_app_button]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    # Отправляем сообщение с кнопкой
    await update.message.reply_text(
        "📚 Откройте наш каталог кроссовок в мини-приложении:",
        reply_markup=reply_markup
    )

def main() -> None:
    application = Application.builder().token("7689838916:AAHC33XLI848zPrig2b9PgCvtf9zC5EjIhw").build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.Text("О боте"), about_command))
    application.add_handler(MessageHandler(filters.Text("Каталог"), catalog_command))
    
    application.run_polling()

if __name__ == "__main__":
    main()