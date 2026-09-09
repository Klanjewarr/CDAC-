#include<iostream>
using namespace std;

class Menu{
    public:
    void showMenu(){
        cout<<"\"Welcome to Sweet Freeze!\""<<endl;
        cout<<"How May I help you sir or maam?,"<<endl;
        cout<<endl;
        cout<<"*** List of Menu for Ice Creame Items ***"<<endl;
        cout<<endl;
        cout<<"1.Vanilla                prize:Rs.150"<<endl;
        cout<<"2.Butterscotch           prize:Rs.160"<<endl;
        cout<<"3.Mango                  prize:Rs.80"<<endl;
        cout<<"4.Strawberry             prize:Rs.200"<<endl;
        cout<<"5.Nutty Fruty            prize:Rs.180"<<endl;
        cout<<endl;
        cout<<"*******List of Hot Beverages*******"<<endl;
        cout<<"6.Coffee                 prize:Rs.20"<<endl;
        cout<<"7.Tea                    prize:Rs.10"<<endl;
        cout<<"8.____To Exit____"<<endl;
    }
};

class Order{
    public:
    int ite, quantity;
    string itemName;
    int unitPrice;

    void takeOrder(){
        cout<<"Enter the order here: ";
        cin>>ite;
        cout<<"Enter the Quantity of the item you want: ";
        cin>>quantity;

        // map item number to name + price
        switch(ite){
            case 1: itemName="Vanilla";      unitPrice=150; break;
            case 2: itemName="Butterscotch"; unitPrice=160; break;
            case 3: itemName="Mango";        unitPrice=80;  break;
            case 4: itemName="Strawberry";   unitPrice=200; break;
            case 5: itemName="Nutty Fruty";  unitPrice=180; break;
            case 6: itemName="Coffee";       unitPrice=20;  break;
            case 7: itemName="Tea";          unitPrice=10;  break;
            default: itemName="Unknown";     unitPrice=0;   break;
        }
    }

    void invoice(){
        int total = unitPrice * quantity;

        cout<<"-----------------------------------------"<<endl;
        cout<<"                -Invoice-                "<<endl;
        cout<<"-----------------------------------------"<<endl;
        cout<<"Invoice Number: 001       Date:08/09/2026"<<endl;
        cout<<"Customer Name: Unknown                   "<<endl;
        cout<<"-----------------------------------------"<<endl;
        cout<<"Order Number: 1                          "<<endl;
        cout<<"Item Description       :"<<itemName<<endl;
        cout<<"No.of Quantity         :"<<quantity<<endl;
        cout<<"Item unit Prize        :"<<unitPrice<<endl;
        cout<<"Total Amount Rs.       :"<<quantity<<"*"<<unitPrice<<" = "<<total<<endl;
        cout<<"-----------------------------------------"<<endl;
        cout<<"Thank you for your order, please visit again!"<<endl;
        cout<<"-----------------------------------------"<<endl;
    }
};

int main(){
    Menu m;
    Order o;

    m.showMenu();
    o.takeOrder();
    o.invoice();

    return 0;
}