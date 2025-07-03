from telegram import Update, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Application, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [KeyboardButton("/start")],
        [KeyboardButton("О боте")],
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
    await update.message.reply_text(
        "Привет! Я бот vadick. Выберите команду:",
        reply_markup=reply_markup,
    )

async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Этот бот создан для заказа кроссовок.")

def main() -> None:
    application = Application.builder().token("7689838916:AAHC33XLI848zPrig2b9PgCvtf9zC5EjIhw").build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("О боте", about_command))
    application.run_polling()

if __name__ == "__main__":
    main()